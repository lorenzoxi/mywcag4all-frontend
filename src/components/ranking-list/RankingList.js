import {React, useMemo} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import RankingCard from '../ranking-card/RankingCard';

function RankingList(props) {

    const list = useMemo(() => {

        return(
            props.rankingList ?

            props.rankingList.map((element, index)=> (
                <RankingCard username={element.username} totalScore={element.score} totalWebsite={element.total} totalA={element.a} totalAA={element.aa} totalAAA={element.aaa} totalAgid={element.agid} position={index+1}/>
            ))

            :

            (
                <span>
                    nessun dato...riprova più tardi
                </span>
            )

        )
        
    }, [props.rankingList])

      return(
        <ListGroup as="ol" className="ranking-list">
            {list}
        </ListGroup>
      )
  }

export default RankingList;