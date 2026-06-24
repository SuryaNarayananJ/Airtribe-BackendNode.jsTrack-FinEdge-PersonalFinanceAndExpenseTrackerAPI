class CacheService {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttlSeconds = 60) {
    const expiry = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const cachedData = this.cache.get(key);
    if (!cachedData) return null;

    if (Date.now() > cachedData.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cachedData.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

// Export a singleton instance
module.exports = new CacheService();
