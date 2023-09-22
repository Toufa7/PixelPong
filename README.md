# To create a new React project:

    npm create vite@latest

# Install npm modules:
    npm install
    npm install nes.css
    npm install react-cookie
    npm install -D sass
    npm install jwt-decode
    npm install react-router-dom

# Run server:

    npm run dev


# Ressource :

# Logos :

https://iconduck.com/sets/pixelarticons-icons-set

## Interface :

https://www.pluralsight.com/guides/use-interface-props-in-functional-components-using-typescript-with-react 

## Uploading an image to the backend

https://stackoverflow.com/questions/41453224/uploading-a-file-with-reactjs-and-dealing-with-c-fakepath-file

## Axios

https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples

https://stackoverflow.com/questions/61385454/how-to-post-multiple-axios-requests-at-the-same-time

## DataStructures : 

* Map : 

https://howtodoinjava.com/typescript/maps/


    interface UserSettingsProps {
        name: string;
        avatar: string;
    }

    // const userSettingsData = (props : {name : string, avatar : string}) 
    const userSettingsData = (props: UserSettingsProps) => {
    const data = {
        username: props.name,
        avatar: props.avatar
    };
    const endpoint = 'http://localhost:3000';
    axios.post(endpoint, data)
        .then(response => {
        })
        .catch(error => {
        });
    }
