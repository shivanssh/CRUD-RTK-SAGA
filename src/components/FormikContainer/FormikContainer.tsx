import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  addUserRequested,
  clearError,
  updateUserRequested,
} from '../../redux/features/usersSlice';
import './FormikContainer.scss';
import { useAppSelector } from '../../hooks/dispatchSelection';
import { User } from '../../types';
import { formValidationSchema } from './../../utils/usersSchemaValidation';
import { useAppDispatch } from './../../hooks/dispatchSelection';
import AddUpdateUserForm from './../AddUpdateUserForm/AddUpdateUserForm';
import {
  errorToast,
  isObjectEmpty,
  updateUserToast,
  addUserToast,
} from './../../utils/helper';

const FormikContainer = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { users, error, isUsersListUpdated } = useAppSelector(
    (state) => state.users
  );

  const initialValues: Partial<User> = {
    name: '',
    email: '',
    age: '',
    address: '',
  };
  const [currentUser, setCurrentUser] = useState(initialValues);

  // To find & set user in localstate as well as in localStorage
  useEffect(() => {
    const user = users.find((user: User) => user.id === Number(id));

    if (user && !isObjectEmpty(user)) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [id]);

  useEffect(() => {
    dispatch(clearError());
    if (isEdit) {
      const user = localStorage.getItem('user');
      user && setCurrentUser(JSON.parse(user));
    }
  }, [dispatch]);

  const onSubmit = (values: any) => {
    isEdit
      ? dispatch(updateUserRequested(values))
      : dispatch(addUserRequested(values));
  };

  // To get latest state for redux store and act accordingly
  useEffect(() => {
    if (isEdit) {
      error && (errorToast(), dispatch(clearError()));
      isUsersListUpdated && (navigate('/'), updateUserToast());
    } else {
      error && (errorToast(), dispatch(clearError()));
      isUsersListUpdated && (navigate('/'), addUserToast());
    }
  }, [error, isUsersListUpdated]);

  return (
    <div className='formik-container'>
      <div className='heading'> {isEdit ? 'Update User' : 'Add User'}</div>
      <Formik
        initialValues={currentUser || initialValues}
        validationSchema={formValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => <AddUpdateUserForm formik={formik} isEdit={isEdit} />}
      </Formik>
    </div>
  );
};

export default FormikContainer;
