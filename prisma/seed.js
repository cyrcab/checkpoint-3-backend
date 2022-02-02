const prisma = require("../helpers/prisma");

async function main() {
	const role = await prisma.role.createMany({
		data: [
			{
				name: "admin",
			},
			{
				name: "client",
			},
			{
				name: "guest",
			},
		],
	});

	const user = await prisma.user.createMany({
		data: [
			{
				roleId: 1,
				lastname: "Lampion",
				firstname: "Gerard",
				mail: "lampion@mail.fr",
				password:
					"$argon2id$v=19$m=16,t=2,p=1$bWFkYW1lZGVyZW5hbGVzdGxvdWlzZQ$bwsiQNeXuTA3SHWe0bAjeg",
			},
			{
				roleId: 2,
				lastname: "Bertaut",
				firstname: "Fabien",
				mail: "bertaut@mail.fr",
				password:
					"$argon2id$v=19$m=16,t=2,p=1$bWFkYW1lZGVyZW5hbGVzdGxvdWlzZQ$bwsiQNeXuTA3SHWe0bAjeg",
			},
			{
				roleId: 3,
				mail: "gest@mail.fr",
			},
		],
	});

	const reservation = await prisma.reservation.createMany({
		data: [
			{
				date: new Date(`2022-05-23`),
				nbrGest: 3,
			},
			{
				date: new Date(`2022-07-23`),
				nbrGest: 8,
			},
			{
				date: new Date(`2022-01-23`),
				nbrGest: 2,
			},
		],
	});

	console.log(role, user, reservation);
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
