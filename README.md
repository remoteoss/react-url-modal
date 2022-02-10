# React URL Modal

A React library to help you keep track of your modal state using the URL.

![Build Passing](https://img.shields.io/github/checks-status/remoteoss/react-url-modal/main?style=flat-square)

## Features

- ☁️ Have URL's for modals
- 🔒 Encode all the parameters sent to a modal
- 🦄 Works on any framework since it uses [the history api](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- 📦 Headless and tiny
- 🚀 Supports React Portals

## Documentation

[Documentation](https://react-url-modal.vercel.app)

To create a new instance of modals, import the `URLModal` and pass the modals you have in your application:

```jsx
import { URLModal } from 'react-url-modal';
import { CreateAccount, EditAccount } from './Modals';

export const App = () => (
  <URLModal
    modals={{
      createAccount: CreateAccount,
      editAccount: EditAccount,
    }}
  />
);
```

To open this modal from any button in your application, use the `openModal` function and pass the name of the modals and any params this modal needs:

```jsx
import { openModal } from 'react-url-modal';

<button
  onClick={() =>
    openModal({
      name: 'editAccount',
      params: {
        userId: user.id,
      },
    })
  }
>
  Edit your profile
</button>
```

Then, in your modal you will have access to any param you passed to it:

```jsx
const ModalWithParams = ({
  params,
  onClose,
}: {
  params: { [key: string]: string },
  onClose: () => void,
}) => (
  <>
    {params.userId}
    <button onClick={onClose}>CloseModal</button>
  </>
);
```

You can also pass a `Wrapper` to the `<URLModal>` component which will wrap all your modals and will have access to the `onClose` function:

```jsx
<URLModal
  modals={{
    customWrapper: CustomWrapperModal,
  }}
  Wrapper={({ onClose, children }) => (
    <>
      {children}
      <button onClick={onClose} type="button" aria-label="Close modal">
        x
      </button>
    </>
  )}
/>
```

To see all the available props, please check the API reference below.

## API Reference

#### URLModal

```jsx
<URLModal
  modals={{
    test: TestModal,
  }}
/>
```

| Parameter       | Type                                                    | Description                                          |
| :-------------- | :------------------------------------------------------ | :--------------------------------------------------- |
| `modals`        | `[name: string]: React Component or Promise<Component>` | **Required**                                         |
| `Wrapper`       | `React Component`                                       | A component to wrap each modal with                  |
| `usePortal`     | `boolean`                                               | Should this modal be mounted on a portal             |
| `portalElement` | `HTML Element`                                          | A component to mount the modals in, defaults to body |

#### openModal

Will open any modal you declared in `modals` by passing its name.

```js
openModal({
    name: 'createAccountForm'
    params: {
        hello: 'world'
    }
})
```

| Parameter | Type                      | Description                             |
| :-------- | :------------------------ | :-------------------------------------- |
| `name`    | `string`                  | **Required**. Name of the modal to open |
| `params`  | `{[key: string]: string}` | Any params this modal need              |

#### closeModal

Close all open modals.

```js
closeModal();
```

#### isModalOpen

Checks if a modal passed is open at the moment the function is called

```js
isModalOpen('createAccountForm');
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `name`    | `string` | **Required**. Name of the modal to check open |

#### encodeUrlParams

Useful if you want to open a modal by a link instead of a button. It will create the url from the params passed.

```js
router.push({
  pathname: '/account',
  query: {
    modal: 'editAccount',
    params: encodeUrlParams({
      id: user.id,
    }),
  },
});
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `params`  | `Object` | **Required**. Object you want to encode |

## Run Locally

Clone the project

```bash
  git clone git@github.com:remoteoss/react-url-modal.git
```

Go to the project directory

```bash
  cd react-url-modal
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

To open the example and test your changes please in another tab and run:

```bash
cd example
yarn && yarn dev
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

To run coverage you can run:

```bash
  yarn test:coverage
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
