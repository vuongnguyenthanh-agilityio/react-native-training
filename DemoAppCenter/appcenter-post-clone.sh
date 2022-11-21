
# Creates an .env from ENV variables to use with react-native-dotenv
ENV_WHITELIST=${ENV_WHITELIST:-"^RN_"}
set | egrep -e $ENV_WHITELIST | sed 's/^RN_//g' > .env
