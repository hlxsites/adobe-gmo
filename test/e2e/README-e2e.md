# Playwright End-to-End Tests

**Currently, this only runs locally.**

This is not thoroughly tested, but it should mostly work. It's mostly a smoke test to make sure that nothing major
brakes. 

## Creating a test user

(maybe ask @wingeier to use his account)

1. Open the https://experience-stage.adobe.com/?shell_ims=prod&shell_source=stage#/@skylineprodtest017/contenthub, 
2. logout
3. press `Create an account`. Use `username+somemoreinfo@adobetest.com` as the email address. 
4. create a safe password and store it in your password manager
5. In https://adminconsole.adobe.com/ add the user to the required groups (to be defined)


## Setup: 

1. `npm ci`
2. export user credentials: 
```
export TEST_USERNAME="wingeier+contenthub-testing@adobetest.com"; 
export TEST_PASSWORD="password"; 
export SHELL_SOURCE=stage
```

or to test locally, change SHELL_SOURCE: 
```
export SHELL_SOURCE=dev
```

## Run

```
touch .auth/user.json
npx playwright test --ui
```

## Generate more code

npx playwright codegen --load-storage .auth/user.json "https://experience-qa.adobe.com/?shell_ims=prod&shell_source=dev#/@skylineprodtest017/contenthub/"


