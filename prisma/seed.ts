import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
async function main() {
    // Create system domains
    const systemDomains = [
        'app.linkpro.com',
        'app.link.com',
        'click.localhost.test'
    ];

    for (const domainName of systemDomains) {
        await prisma.domain.upsert({
            where: { domainName },
            update: {},
            create: {
                domainName,
                isVerified: true,
                isSystemDomain: true,
            },
        });
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
        await prisma.$disconnect();
    });