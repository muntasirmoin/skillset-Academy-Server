import React from 'react';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const MyCart = () => {
    const [cart, refetch] = useCart();
    // console.log('cart', cart);
    const total = cart?.reduce((sum, item) => parseFloat(item.price) + sum, 0);

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure to delete this selected class?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://skillset-academy-server.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Selected class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }




    return (
        <div>
            <h3 className="text-3xl font-semibold my-4 text-center">Selected Class: {cart.length} </h3>
            <h4 className='font-semi-bold'>Total price:$ {total}</h4>
            {/* <button className='btn btn-outline btn-success'>pay</button> */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>

                        <tr>
                            <th className='text-center border px-4 py-2'>#</th>
                            {/* <th className='text-center border px-4 py-2'>Image</th> */}
                            <th className='text-center border px-4 py-2'>Class Name</th>


                            <th className='text-center border px-4 py-2'>price</th>
                            <th className='text-center border px-4 py-2'>pay</th>
                            <th className='text-center border px-4 py-2'>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((classe, index) => <tr key={classe._id}>
                                <th className='text-center border px-4 py-2'>{index + 1}</th>
                                {/* <td className='text-center border px-4 py-2'><img src={classe.classImageUrl} alt="image" /></td> */}
                                <td className='text-center border px-4 py-2'>{classe.className}</td>


                                <td className='text-center border px-4 py-2'>$ {classe.price}</td>

                                <td className='text-center border px-4 py-2'>
                                    <Link to={`/dashboard/payment/${classe.selectId}`}>
                                        <button className="btn btn-sm btn-outline btn-success" style={{ fontSize: '10px' }}>pay</button>
                                    </Link>
                                </td>

                                <td className='text-center border px-4 py-2'> <button onClick={() => handleDelete(classe)} className="btn btn-sm btn-outline btn-error" style={{ fontSize: '10px' }}>Delete</button> </td>



                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;