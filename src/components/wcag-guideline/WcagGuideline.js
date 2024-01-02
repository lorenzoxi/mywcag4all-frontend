import { React, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import ItemList from '../item-list/ItemList';

function WcagGuideline(props) {

    const guidelinesResolved = useMemo(() => {
        return <ItemList cardList={props.criteria} type="wcag" />

    
    }, [props.criteria])


    return (

        <Card className="card-specific shadow1">

            <Card.Header className="border-bottom">

                <h2>
                    Linea guida {props.index} - {props.title}
                    </h2>

                    <p>
                        {props.description}
                    </p>
            </Card.Header>

            <Card.Body>
                
                {guidelinesResolved}
                
            </Card.Body>

        </Card>

    )

}

export default WcagGuideline;
