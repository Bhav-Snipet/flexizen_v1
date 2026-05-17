package com.flexizen.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * Utility to retrieve the currently authenticated admin's details from the SecurityContext.
 * Used in service layers to get the logged-in admin's username.
 */
@Component
public class SecurityUtil {

    /**
     * Returns the username of the currently authenticated admin.
     * @return username string or "anonymousUser" if not authenticated
     */
    public static String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }
        return "anonymousUser";
    }

    /**
     * Returns true if the current session has an authenticated admin.
     */
    public static boolean isAuthenticated() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated()
            && !"anonymousUser".equals(auth.getPrincipal());
    }
}
