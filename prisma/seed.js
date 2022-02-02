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
				// password = password
				password:
					"$argon2id$v=19$m=65536,t=5,p=1$nwQQkV+G42wgGo8W/7iplA$PJXdr+L5KeZEbpUoupMozY3gjXYdxXAnae/i4ZAYBVw",
			},
			{
				roleId: 2,
				lastname: "Bertaut",
				firstname: "Fabien",
				mail: "bertaut@mail.fr",
				password:
					"$argon2id$v=19$m=65536,t=5,p=1$nwQQkV+G42wgGo8W/7iplA$PJXdr+L5KeZEbpUoupMozY3gjXYdxXAnae/i4ZAYBVw",
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
				nbrGuest: 3,
			},
			{
				date: new Date(`2022-07-23`),
				nbrGuest: 8,
			},
			{
				date: new Date(`2022-01-23`),
				nbrGuest: 2,
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
