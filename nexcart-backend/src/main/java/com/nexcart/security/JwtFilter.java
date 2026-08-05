package com.nexcart.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String token = jwtUtils.getJwtFromCookies(request);
            logger.debug("Processing JWT filter for request {}", request.getRequestURI());

            if (token == null) {
                String authHeader = request.getHeader(AUTHORIZATION_HEADER);
                if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
                    token = authHeader.substring(BEARER_PREFIX.length());
                }
            }

            if (token != null && jwtUtils.validateToken(token)) {
                Claims claims = jwtUtils.getClaimsFromToken(token);
                String username = claims.getSubject();
                logger.info("Authenticated request for user: {}", username);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                logger.debug("User details loaded: {}", userDetails);

                @SuppressWarnings("unchecked")
                List<String> rolesFromClaims = (List<String>) claims.get("roles");

                List<String> filteredRoles = rolesFromClaims != null
                        ? rolesFromClaims.stream()
                            .filter(role -> role.startsWith("ROLE_"))
                            .collect(Collectors.toList())
                        : userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList());

                logger.debug("Roles from JWT claims={} filtered roles={}", rolesFromClaims, filteredRoles);

                Collection<GrantedAuthority> authorities = filteredRoles.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.debug("Authentication set in SecurityContext: {}", SecurityContextHolder.getContext().getAuthentication());
            } else {
                logger.debug("No valid JWT token found for request {}", request.getRequestURI());
            }
        } catch (Exception ex) {
            logger.error("Cannot set user authentication: {}", ex.getMessage(), ex);
        }

        filterChain.doFilter(request, response);
    }
}
