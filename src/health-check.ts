/* istanbul ignore file -- @preserve */
try {
  await fetch("http://localhost:8000/robots.txt");
  process.exit(0);
} catch {
  process.exit(1);
}

export {};
