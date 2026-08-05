package com.nexcart.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpirationMs;

    @Value("${app.jwt.cookie-name:nexcart-jwt}")
    private String jwtCookieName;

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .filter(role -> role.startsWith("ROLE_"))
                .toList();

        logger.info("Starting JWT generation for username={} with roles={}", username, roles);
        return generateTokenFromUsername(username, roles);
    }

    public String generateTokenFromUsername(String username) {
        logger.info("Generating JWT token for username={} without roles", username);
        return generateTokenFromUsername(username, List.of());
    }

    public String generateTokenFromUsername(String username, List<String> roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        List<String> filteredRoles = roles.stream()
                .filter(role -> role.startsWith("ROLE_"))
                .toList();

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", filteredRoles);

        logger.debug("Building JWT: subject={}, issuedAt={}, expiresAt={}, roles={}", 
                     username, now, expiryDate, filteredRoles);

        String token = Jwts.builder()
                .subject(username)
                .claims(claims)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();

        logger.info("JWT token generated successfully for username={} (token length={})", username, token.length());
        return token;
    }

    public String getJwtFromCookies(HttpServletRequest request) {
        logger.debug("Attempting to retrieve JWT from cookie '{}'", jwtCookieName);
        Cookie cookie = WebUtils.getCookie(request, jwtCookieName);
        String token = cookie != null ? cookie.getValue() : null;
        logger.info("JWT {} from cookie '{}'", token != null ? "retrieved" : "not found", jwtCookieName);
        return token;
    }

    public ResponseCookie generateJwtCookie(String token) {
        logger.debug("Generating JWT cookie with name={} and maxAge=24h", jwtCookieName);
        return ResponseCookie.from(jwtCookieName, token)
                .path("/api")
                .maxAge(24 * 60 * 60)
                .httpOnly(true)
                .build();
    }

    public ResponseCookie getCleanJwtCookie() {
        logger.debug("Clearing JWT cookie with name={}", jwtCookieName);
        return ResponseCookie.from(jwtCookieName, "")
                .path("/api")
                .maxAge(0)
                .httpOnly(true)
                .build();
    }

    public String getUserNameFromJwtToken(String token) {
        Claims claims = getClaimsFromToken(token);
        String subject = claims.getSubject();
        logger.debug("Extracted username={} from JWT token", subject);
        return subject;
    }

    public Claims getClaimsFromToken(String token) {
        logger.info("Parsing claims from JWT token (prefix={})", token.substring(0, Math.min(10, token.length())));
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        logger.info("Claims parsed successfully: subject={}, issuedAt={}, expiresAt={}, roles={}", 
                    claims.getSubject(), claims.getIssuedAt(), claims.getExpiration(), claims.get("roles"));
        return claims;
    }

    public boolean validateToken(String token) {
        logger.debug("Validating JWT token (prefix={})", token.substring(0, Math.min(10, token.length())));
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            logger.info("JWT token validated successfully for subject={}", getUserNameFromJwtToken(token));
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {} (prefix={})", e.getMessage(), token.substring(0, Math.min(10, token.length())));
        } catch (ExpiredJwtException e) {
            logger.warn("JWT token expired: {} (prefix={})", e.getMessage(), token.substring(0, Math.min(10, token.length())));
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {} (prefix={})", e.getMessage(), token.substring(0, Math.min(10, token.length())));
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string empty: {} (prefix={})", e.getMessage(), token.substring(0, Math.min(10, token.length())));
        }
        return false;
    }

    private SecretKey getSigningKey() {
        try {
            logger.debug("Attempting to decode JWT secret as Base64");
            SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
            logger.info("JWT signing key derived using Base64 decoding");
            return key;
        } catch (IllegalArgumentException ex) {
            logger.warn("JWT secret not Base64 encoded, using raw UTF-8 bytes");
            return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        }
    }
}
