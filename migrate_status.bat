call npx prisma db push > prisma_push.txt 2>&1
call npx prisma generate >> prisma_push.txt 2>&1
echo DONE >> prisma_push.txt
