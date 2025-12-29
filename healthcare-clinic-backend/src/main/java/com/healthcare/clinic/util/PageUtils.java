package com.healthcare.clinic.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PageUtils {
    public static Pageable from(int page, int size) {
        int p = Math.max(0, page);
        int s = Math.min(100, Math.max(1, size));
        return PageRequest.of(p, s);
    }
}
