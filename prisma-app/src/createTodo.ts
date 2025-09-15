import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addTodo(title:string,description:string,userId:number) {
  const res = await prisma.todo.create({
     data : {
      title,
      description,
      userId
     }
  }) 
  console.log(res);
}

/* addTodo("food","Eating food at 1 PM",1);
addTodo("Play","Play crickte with friends at evening around 5 PM",1);
addTodo("food","Eating food at 3 PM",2);
addTodo("Play","Play badminton at night around 9 PM",2);
*/

async function getTodos(userId:number) {
  const res = await prisma.todo.findMany({
    where : {
      userId
    }
  })
  console.log(res);
}

// getTodos(2);

async function getTodosAndUserDetails(userId: number, ) {
    const todos = await prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    });
    console.log(todos);
}

getTodosAndUserDetails(1);