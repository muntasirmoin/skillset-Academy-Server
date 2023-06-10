import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../providers/AuthProvider';

const AddClass = () => {
    
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const instructorEmail = user?.email;
  const instructorName = user?.displayName;

  const onSubmit = (data) => {
    // Handle class creation logic


    console.log(data);

    // 
    fetch(`http://localhost:3000/class`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data);
        if(data.insertedId){
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Class created successfully!',
                showConfirmButton: false,
                timer: 1500
              });
         
        }
      })


    // 
    
    // You can make a request to your backend API here to create the class
    
    // Show success message
   

    // Redirect to a success page or desired route
    navigate('/dashboard/addclass');
  };
    return (
        <div>
            

            <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xs">
            <h3 className="text-3xl font-semibold my-4 text-center">Add a Class</h3>
      <form className="bg-white shadow-md rounded px-8 py-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="className">
            Class Name
          </label>
          <input
            {...register('className', { required: 'Class Name is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="className"
            type="text"
            placeholder="Class Name"
          />
          {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="classImage">
            Class Image
          </label>
          <input
            {...register('classImage')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="classImage"
            type="file"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructorName">
            Instructor Name
          </label>
          <input
            {...register('instructorName', { required: 'instructorName is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            id="instructorName"
            type="text"
            defaultValue= {instructorName}
            value={user?.displayName}
            readOnly
          />
          {/* <input
           {...register('instructorName')}
           
            value={user?.displayName}
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            id="instructorName"
            type="text"
            defaultValue={instructorName}
            readOnly
          /> */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructorEmail">
            Instructor Email
          </label>
          <input
            {...register('instructorEmail', { required: 'instructorEmail is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            id="instructorEmail"
            type="text"
            defaultValue= {instructorEmail}
            value={user?.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableSeats">
            Available Seats
          </label>
          <input
            {...register('availableSeats', { required: 'Available Seats is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="availableSeats"
            type="number"
            placeholder="Available Seats"
          />
          {errors.availableSeats && <p className="text-red-500 text-xs mt-1">{errors.availableSeats.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            {...register('price', { required: 'Price is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Price"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <input
            {...register('status', { required: 'Status is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            id="status"
            type="text"
            defaultValue="pending"
            readOnly
          />
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
        </div>
        {/* test */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
           Student Enroll
          </label>
          <input
            {...register('enroll', { required: 'Erool is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            id="enroll"
            type="text"
            defaultValue= '0'
            readOnly
          />
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
        </div>

        {/* test */}
        <div className="flex items-center justify-center">
        <button
className="btn btn-outline btn-success"
              type="submit"
            >
             Add A Class
            </button>
        </div>
      </form>
    </div>
    </div>
    </div>
            
        </div>
    );
};

export default AddClass;