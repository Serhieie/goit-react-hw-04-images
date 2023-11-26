import { IoSearch } from 'react-icons/io5';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { warnTostCall, toastCallError } from '../../helpers/toast';
import { searchSchema } from 'helpers/searchSchema';

export const SearchForm = ({ onSearch }) => {
  const handleSubmit = async (values, actions) => {
    if (!values.search.trim()) {
      return warnTostCall();
    }
    try {
      await onSearch(values.search);
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      console.log(error);
      toastCallError();
    }
  };

  return (
    <Formik
      initialValues={{ search: '' }}
      // Using Yup schema for validation from helpers "searchSchema"
      validationSchema={searchSchema}
      onSubmit={handleSubmit}
    >
      {/* One of the Formik flags witch gieaving opportunity to hendle loading time.
      Here its used for blocking submit button to prevent to many fetches */}
      {({ isSubmitting }) => (
        <Form className="flex items-center w-full max-w-[600px] bg-white rounded overflow-hidden ">
          <button
            type="submit"
            className="flex justify-center items-center w-12 h-12 border-0 opacity-60 outline-none 
            cursor-pointer transition-opacity duration-300 hover:opacity-100"
            disabled={isSubmitting}
          >
            <span className="ml-auto ">
              <IoSearch className="fill-current text-indigo-800" />
            </span>
          </button>
          <Field
            className="w-full inline-block font-light text-xl border-0 outline-0 px-6 
            placeholder:font-extralight placeholder:text-lg placeholder:text-indigo-900 placeholder:opacity-90 text-indigo-900"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
          />
          {/* part of Formik liberty + Yup validation toogether error message for showing error messages from falidation */}
          <ErrorMessage
            name="search"
            component="div"
            className="text-white bg-red-500  absolute 
            -bottom-6 left-1/2 py-0.5  text-xl font-light tracking-widest 
            -translate-x-2/4  rounded  max-w-[580px] w-full text-center"
          />
        </Form>
      )}
    </Formik>
  );
};
