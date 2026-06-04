export const prisma = new Proxy(
  {},
  {
    get() {
      throw new Error("Prisma is not configured for the CSV-only webinar demo.");
    },
  }
) as never;
