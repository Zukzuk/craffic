helpFunction()
{
   echo ""
   echo "Usage: $0 -a parameterA -b parameterB"
   echo -e "\t-a Description of what is parameterA"
   echo -e "\t-b Description of what is parameterB"
   exit 1 # Exit script after printing help
}

while getopts "a:b:" opt
do
   case "$opt" in
      a ) parameterA="$OPTARG" ;;
      b ) parameterB="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$parameterA" ] || [ -z "$parameterB" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

# Begin script in case all parameters are correct
echo "$parameterA"
echo "$parameterB"

# https://docs.docker.com/docker-hub/builds/

# git status
# git pull
# git add .
# git commit -m "feat()"
# npm version patch|minor|major
# npm run build:nestjs
# docker login -u zukzuk
# docker push zukzuk/craffic-nestjs