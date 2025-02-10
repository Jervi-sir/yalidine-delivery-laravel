import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const OrderContext = createContext(null);

export function OrderProvider({ children, products }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    recipient: '',
    firstName: '',
    familyName: '',
    contactPhone: '',
    from_wilaya_id: null,
    to_wilaya_id: null,
    to_commune_id: null,
    to_center_center_id: null,
    address: '',
    order_date: null,
    is_stopdesk: null,
    do_insurance: false,
    declared_value: 0,
    freeshipping: false,
    has_exchange: false,
    product_id: '',
    quantity: '',
    amount: '',
    price: null,
    product_to_collect: null,
    more_then_5kg: false,

    order_length: null,
    order_width: null,
    order_height: null,
    order_weight: null,
  });

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [centers, setCenters] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    axios.get('/api/get-wilayas').then(response => {
      setWilayas(response.data.data);
      const savedFromWilaya = localStorage.getItem('from_wilaya_id');
      if (savedFromWilaya) {
        setData('from_wilaya_id', parseInt(savedFromWilaya) as any);
      }
    });
  }, []);

  const handleWilayaChange = (wilayaId) => {
    setData('to_wilaya_id', wilayaId);
    setData('to_commune_id', '');
    setData('to_center_center_id', '');

    axios.get('/api/get-communes', {
      params: { wilaya_id: wilayaId }
    }).then(response => {
      setCommunes(response.data.data);
    });

    axios.get('/api/get-centers', {
      params: { wilaya_id: wilayaId }
    }).then(response => {
      setCenters(response.data.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('orders.store'), {
      onSuccess: () => {
        reset();
        setDate(null);
      },
      onError: (err) => {
        console.log(err);
      }
    });
  };

  const value = {
    data,
    setData,
    processing,
    errors,
    wilayas,
    communes,
    centers,
    products,
    handleWilayaChange,
    handleSubmit,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

