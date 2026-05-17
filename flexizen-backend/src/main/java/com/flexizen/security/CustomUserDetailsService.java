package com.flexizen.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CustomUserDetailsService — Phase 1 Stub.
 *
 * Phase 1: Returns a stub admin user so Spring Security context loads.
 * Phase 2: Replace with actual Admin entity lookup via AdminRepository.
 *
 * TODO (Phase 2): Inject AdminRepository and load Admin entity by username.
 */
@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Phase 1 stub — Spring Security requires this bean to exist for context to load.
        // Phase 2 will implement: adminRepository.findByUsername(username)
        throw new UsernameNotFoundException("UserDetailsService not yet implemented — Phase 2 task.");
    }
}
