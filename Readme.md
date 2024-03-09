# Commands
```
> npx prisma migrate dev --name init
> npx prisma migrate deploy

# generate prisma client files
> npx prisma generate
```

```
> npx ts-node src/index.ts
> npx tsc
> node ./dist/index.js
```

```
> sudo docker build -t grocery_api .
> sudo docker run --name GROCERY_API -p 3000:3000 -d --restart=unless-stopped grocery_api
```