
# Reks manager

[![347401902-1281808342445509-1178348958735599774-n.png](https://i.postimg.cc/tCkQs7Rn/347401902-1281808342445509-1178348958735599774-n.png)](https://postimg.cc/HVrPKYyT)

Reks manager is an initiative to improve the fate and welfare of animals in my hometown. I am developing applications for the association [Reks Malbork](https://www.facebook.com/groups/920156211913804), which for years has been involved in rescuing hundreds of cats and dogs. Reks manager is to streamline the process of storing data of the association's pupils and create a new and better method of animal adoption.

## Technologies

* Next.js 13.4
* TypeScript
* Tailwindcss
* Redux | RTK | RTK Query
* NextAuth
* Neon (Postgresql)
* Prisma
* React-email
* Resend
* React-hook-form
* Yup
* Vercel

## Features

* **Role-based with authorization and access control** - With this, the administrator can grant access to the application and have control over who can do what in the application.
* **Support for sending emails** - This ensures that the admin creating the user account does not have access to passwords or other sensitive data. The system sends a link to the email address provided, through which the user activates the account by assigning his password. In addition, the system supports password reminder by sending a link to the specified email address, through which the old password can be reset.
* **Authorization token** - With NextAuth, the application supports the assignment of a JWT token, thanks to which the user will securely log in to his account. In addition, the application does not display confidential data to an unauthorized user.
* **Adding animals to the dancyh database** - Volunteers use the app to make entries of new wards, which allows them to easily store important information, such as health status, intervention history, general information about where and when the animal was found, the condition in which it was admitted to the association or the location where it is. Whether it is a temporary home, residence or location where the animal is living in the case of free-living animals
* **Profile of the temporary home** - The application has the ability to create a profile of a temporary home. This allows the association to quickly and easily determine the most important information about the temporary home like the owner's data, address and the list of animals the temporary home takes care of.
