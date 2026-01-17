rmdir /s /q node_modules\.prisma
call npx prisma generate > fix_log_2.txt 2>&1
echo DONE >> fix_log_2.txt
