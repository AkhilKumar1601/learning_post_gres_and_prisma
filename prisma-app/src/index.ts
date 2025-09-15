import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
  firstName : string,
  lastName : string
};

async function insertUser (username : string, password : string, firstName : string, lastName : string) {
    const res = await prisma.user.create({
      data : {
        username,
        password,
        firstName,
        lastName
      }
    })
    
    console.log(res);
  }

// insertUser("akhil","12332","akhil","kumar");

async function updateUser(data : UpdateParams, username : string) {
  const { firstName, lastName } = data;
  const res = await prisma.user.update({
    where : { username },
    data : {
        firstName,
        lastName
    }
  })
  console.log(res); 
}

// insertUser("akhilKumar@gmail.com","kjlklj","akhil","kumar");
// updateUser({firstName:"new name", lastName : "singh"},"akhil");

async function getUser(username : string) {
  const user = await prisma.user.findFirst({
    where : {
      username
    }
  })
  console.log(user);
}

getUser("akhil");