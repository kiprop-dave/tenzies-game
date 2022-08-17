
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin https://github.com/kiprop-dave/tenzies-game.git
git add -A
git commit -m 'first deploy'
git branch -M production
git push -u origin production

cd -
