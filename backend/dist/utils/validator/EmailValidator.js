import validator from 'validator';
export class EmailValidator {
    static isValid(email) {
        return validator.isEmail(email, { allow_utf8_local_part: false });
    }
    /**
     * Normalises the e‑mail (lower‑case, removes sub‑addressing etc.).
     * Throws if the result is falsy or still invalid.
     */
    static normalize(email) {
        const clean = validator.normalizeEmail(email, { gmail_remove_dots: false });
        if (!clean || !this.isValid(clean)) {
            throw new Error('Invalid e‑mail address');
        }
        return clean;
    }
}
