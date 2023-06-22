// import { Route, redirect ,Routes} from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, isLoggedIn, ...rest }) => {
//   return (
//     <Routes> <Route
//       {...rest}
//       element={
//         isLoggedIn ? (
//           <Component />
//         ) : (
//           <redirect to="/login" replace />
//         )
//       }
//     /></Routes>
//   );
// };

// export default ProtectedRoute;




import { Route, redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;