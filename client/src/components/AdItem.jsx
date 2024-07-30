import {Button, Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const AdItem = ({title, description, img, adId, handleDeleteAd, darkTheme}) => {

    return (
        <Card bg={darkTheme === true ? 'dark' : 'light'} style={{width: '100%', height: '100%'}} text={darkTheme === true ? 'white' : 'dark'}>
            <Card.Img style={{height: '300px', width: '400px'}} variant="top" src={`http://localhost:3132/uploads/${img}`}/>
            <Card.Body >
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <div className="adItem__buttons">
                    <NavLink to={`/ads/${adId}/edit`}>
                        <Button variant="success">Edit</Button>
                    </NavLink>
                    <Button variant="danger" onClick={() => handleDeleteAd(adId)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AdItem;

