/**
 * Validates MONGO_URI shape so mis-pasted Atlas strings fail fast with a clear message.
 * Common mistake: password contains `@` without URL-encoding → driver resolves the wrong host (e.g. ENOTFOUND _mongodb._tcp.2005).
 */
export const assertValidMongoUri = (uri: string): void => {
  const trimmed = uri.trim();

  if (!trimmed.startsWith('mongodb://') && !trimmed.startsWith('mongodb+srv://')) {
    throw new Error('MONGO_URI must start with mongodb:// or mongodb+srv://');
  }

  // Local MongoDB — no Atlas-style checks
  if (trimmed.includes('localhost') || trimmed.includes('127.0.0.1')) {
    return;
  }

  const afterScheme = trimmed.replace(/^mongodb(\+srv)?:\/\//, '');
  const atCount = (afterScheme.match(/@/g) ?? []).length;

  if (atCount === 0) {
    throw new Error(
      'MONGO_URI must include credentials and host in the form mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/...'
    );
  }

  if (atCount > 1) {
    throw new Error(
      'MONGO_URI contains more than one @. That usually means your database password includes @ (or another special character) and was not URL-encoded. In Atlas, use "Edit" on the connection string and replace the password with a URL-encoded version (@ → %40, # → %23, / → %2F).'
    );
  }

  const hostPart = afterScheme.split('@')[1]?.split('/')[0]?.split('?')[0]?.trim();

  if (!hostPart) {
    throw new Error('MONGO_URI is missing the hostname after @.');
  }

  if (!hostPart.includes('.')) {
    throw new Error(
      `MONGO_URI hostname "${hostPart}" looks invalid. Expected a hostname like cluster0.xxxxx.mongodb.net.`
    );
  }

  if (/^\d+$/.test(hostPart)) {
    throw new Error(
      `MONGO_URI hostname "${hostPart}" is not a valid cluster host. Re-copy the full connection string from MongoDB Atlas → Database → Connect → Drivers.`
    );
  }
};
