// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { useAuth0 } from "@auth0/auth0-react";
// import GPTA from '../Components/GPTA';
// import App from '../App';
// import {Provider} from 'react-redux'
// import { createStore} from 'redux'
// import Reducer from '../Reducer/reducer';
// import { mocked } from "jest-mock";



// const user = {
//    email: "johndoe@me.com",
//    email_verified: true,
//    sub: "google-oauth2|12345678901234",
// };


// jest.mock("@auth0/auth0-react");
 
// const mockedUseAuth0 = mocked(useAuth0, true);

// const mockStore = createStore(Reducer)

// const MockReduxProvider = ({ children }) => {
//   <Provider store={mockStore}>{children}</Provider>
// }

// describe("GPTA Component Tests", () => {
//   beforeEach(()=> {
//     mockedUseAuth0.mockReturnValue({
//       isAuthenticated: true,
//       user,
//       logout: jest.fn(),
//       loginWithRedirect: jest.fn(),
//       getAccessTokenWithPopup: jest.fn(),
//       getAccessTokenSilently: jest.fn(),
//       getIdTokenClaims: jest.fn(),
//       loginWithPopup: jest.fn(),
//       isLoading: false,
//   });
//   })
//   test('renders learn react link', () => {
//     render(
//     <MockReduxProvider>
//       <GPTA />
//     </MockReduxProvider>
//     );
//     const titleElement = screen.getByTestId('GPTAcontainer');
//     expect(titleElement).toBeInTheDocument();
//   });

// })
// test('renders logout button', () => {
//   render(
//     <MockReduxProvider>
//       <GPTA />
//     </MockReduxProvider>
//   );
//   const logoutButton = screen.getByText('log out');
//   expect(logoutButton).toBeInTheDocument()

// })

// export {}
