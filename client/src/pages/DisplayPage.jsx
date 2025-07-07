import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { differenceInYears, format } from 'date-fns';

function DisplayPage() {
  const [user, setUser] = useState(null);
  const [dogUrl, setDogUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Get user from backend
        const userRes = await axios.get('http://localhost:4000/api/user');
        setUser(userRes.data);

        // 🐶 Get dog image
        const dogRes = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogUrl(dogRes.data.message);
      } catch (error) {
        console.error(error);
        alert('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading…</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">No user found.</p>;

  const birthDate = new Date(user.dob);
  const age = differenceInYears(new Date(), birthDate);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-10">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md text-center space-y-4">
        <img
          src={dogUrl}
          alt="Random dog"
          className="w-full h-64 object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold text-blue-700">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-700">DOB: {format(birthDate, 'yyyy-MM-dd')}</p>
        <p className="text-gray-700">
          {age > 0
            ? `Age: ${age} ${age === 1 ? 'year' : 'years'}`
            : `${user.firstName}'s age is less than 1 year`}
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default DisplayPage;
