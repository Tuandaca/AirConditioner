call npx prisma db push --accept-data-loss > prisma_push2.txt 2>&1
call npx prisma generate >> prisma_push2.txt 2>&1
echo DONE >> prisma_push2.txt
