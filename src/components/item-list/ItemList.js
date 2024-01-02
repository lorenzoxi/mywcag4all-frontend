import { React, useMemo } from "react";
import ToolItemCard from "../tool-item-card/ToolItemCard";
import TestItemCard from "../test-item-card/TestItemCard";
import WebsiteItemCard from "../website-item-card/WebSiteItemCard";
import WcagItemCard from "../wcag-item-card/WcagItemCard";
import Card from "react-bootstrap/Card";

function ItemList(props) {
  const itemListResolved = useMemo(() => {
    return (
      props.cardList !== null &&
      props.cardList !== undefined &&
      props.cardList?.length > 0 &&
      props.cardList?.map((card) => {
        switch (props.type) {
          case "test":
            return (
              <TestItemCard
                key={`test-item-${card.id}`}
                id={card.id}
                title={card.name}
                wcaglevel={card.level}
                type={card.type}
                isApplicable={card.is_applicable}
                isPassed={card.is_passed}
                page={props.index}
              />
            );
          case "tool":
            return (
              <ToolItemCard
                key={`tool-item-${card.index}`}
                index={card.index}
                name={card.name}
                types={card.types}
                licenseAbbr={card.licenseabbr}
                licenseName={card.licensename}
                price={card.pricing}
              />
            );
          case "website":
            return (
              <WebsiteItemCard
                key={`website-item-${card.name}`}
                id={card.id}
                name={card.name}
                score={card.score}
                is_pa={card.is_pa}
                update={props.updateHandling}
                level={card.wcag_level}
              />
            );
          case "wcag":
            return (
              <WcagItemCard
                key={`wcag-item-${card.id}`}
                id={card.id}
                index={card.wcagindex}
                title={card.wcagtitle}
                description={card.wcagdescription}
                wcaglevel={card.level}
                url={card.ref_understanding}
                isApplicable={card.is_applicable}
                isPassed={card.is_passed}
                isAgid={
                  card.level === "AA" || card.level === "A" ? true : false
                }
              />
            );
          default:
            return <div></div>;
        }
      })
    );
  }, [props.cardList, props.type, props.updateHandling]);

  const displayList = useMemo(() => {
    //console.log("card list ", props.cardList);
    return props.cardList?.length > 0 ? (
      <ul
        className="w-100 p-0 list-unstyled"
        id={props.uid}
        aria-live="polite"
        aria-atomic="true"
      >
        {itemListResolved}
      </ul>
    ) : (
      <>
        <Card className="main-card shadow1 text-center">
          <p>Nessun {props.element} da visualizzare!</p>
        </Card>
      </>
    );
  }, [itemListResolved, props.cardList, props.element, props.uid]);

  return <div>{displayList}</div>;
}

export default ItemList;
