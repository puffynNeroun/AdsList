import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createAd} from '../redux/actions';
import {useNavigate} from "react-router-dom";
import '../styles/createAdForm.css'

const CreateAdForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkTheme = useSelector(state => state.darkTheme);

    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };

    const handleCreateAd = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (img) {
            formData.append('img', img);
        }

        dispatch(createAd(formData))
            .then(response => {
                    setMessage(response.payload)
                    navigate('/adList')
                }
            )
            .catch(error => setMessage(error.message));
    };

    return (
        <div  className={darkTheme ? 'createAdForm createAdForm--dark' : 'createAdForm createAdForm--white'}>
            <form onSubmit={handleCreateAd} className="createAdForm__container container mt-5">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="img"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Ad</button>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </form>
        </div>
    );
};

export default CreateAdForm;
