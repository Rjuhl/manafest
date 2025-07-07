export default function generateUniqueId(): string {
  const array = new Uint32Array(2); // 2 × 32-bit = 64 bits
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((n) => n.toString(36).padStart(8, '0')) // base36 (0-9, a-z)
    .join('')
    .slice(0, 16); // ensure exactly 16 chars
}
