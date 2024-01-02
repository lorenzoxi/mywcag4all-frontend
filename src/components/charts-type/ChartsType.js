import Container from "react-bootstrap/Container";
import { React, useEffect } from "react";
import Row from "react-bootstrap/Row";
import "react-circular-progressbar/dist/styles.css";
import { PieChart } from "react-minimal-pie-chart";
import Badge from "react-bootstrap/Badge";

function ChartsType({ score, automaticTest, semiautomaticTest, manualTest }) {
  const data = [
    {
      title: "Automatici",
      value: parseInt(automaticTest*1),
      color: "#FF93AC",
      index: 1,
    },
    {
      title: "Semiautomatici",
      value: parseInt(semiautomaticTest*2),
      color: "#F78337",
      index: 2,
    },
    {
      title: "Manuali",
      value: parseInt(manualTest*3),
      color: "#00AF82",
      index: 3,
    },
  ];
  const defaultLabelStyle = {
    fontSize: "7px",
    fontFamily: "Open Sans",
    fill: "#ffffff",
    fontWeight: "bold",
  };


  useEffect(() => {
    const element = Array.from(document.getElementsByClassName("pie-chart"));
    element[0].setAttribute('aria-hidden','true');
    element[0].setAttribute('aria-role','presentation');
  }, []);

  return (
    <>
      <Container className="m-0 p-0">
        <Row className="r-height">
          <p>
            {automaticTest!==1?"Sono stati effettuati con successo":"È stato effettuato con successo"}{" "}
            <Badge bg="" className="badge-auto" as="span" text="black">
              {automaticTest} test {automaticTest!==1?"automatici":"automatico"}{" "}
            </Badge>{" "}
            per un totale di{" "}
            <Badge bg="warning" as="span" text="black">
              {automaticTest * 1}
            </Badge>{" "}
            {automaticTest===1?"punto":"punti"}.
          </p>

          <p>
          {semiautomaticTest!==1?"Sono stati effettuati con successo":"È stato effettuato con successo"}{" "}
            <Badge bg="" className="badge-semi" as="span" text="black">
            {automaticTest} test {semiautomaticTest!==1?"semiautomatici":"semiautomaticio"}{" "}
            </Badge>{" "}
            per un totale di{" "}
            <Badge bg="warning" as="span" text="black">
              {semiautomaticTest * 3}
            </Badge>{" "}
            punti.
          </p>

          <p>
          {manualTest!==1?"Sono stati effettuati con successo":"È stato effettuato con successo"}{" "}
            <Badge bg="" className="badge-manual" as="span" text="black">
            {manualTest} test {manualTest!==1?"manuali":"manuale"}{" "}
            </Badge>{" "}
            per un totale di{" "}
            <Badge bg="warning" as="span" text="black">
              {manualTest * 3}
            </Badge>{" "}
            punti.
          </p>
        </Row>

        <Row className="pie-chart-container d-flex justify-content-center shadow">
          
          <p className="visually-hidden">I test automatici rappresentano l'{Math.ceil((automaticTest*100)/(automaticTest*1 +semiautomaticTest*2+manualTest*3)) } % del totale dei test effettuati</p>
          <p className="visually-hidden">I test automatici rappresentano l'{Math.ceil((semiautomaticTest*100)/(automaticTest*1 +semiautomaticTest*2+manualTest*3)) } % del totale dei test effettuati</p>
          <p className="visually-hidden">I test automatici rappresentano l'{Math.ceil((manualTest*100)/(automaticTest*1 +semiautomaticTest*2+manualTest*3)) } % del totale dei test effettuati</p>
          <h3 className="text-center py-2">Composizione del punteggio</h3>
          <PieChart 
            id="ciao"
            aria-hidden="true"
            className="w-50 pie-chart"
            viewBoxSize={[300, 200]}
            center={[150, 100]}
            data={data}
            radius={30}
            labelPosition={120}
            segmentsShift={2}
            label={({ dataEntry }) =>
              dataEntry.value !== 0
                ? Math.round(dataEntry.percentage) + "% \n" + dataEntry.title
                : ""
            }
            labelStyle={{
              ...defaultLabelStyle,
            }}
            segmentsTabIndex={({ dataEntry }) => dataEntry.index}
          />
        </Row>
      </Container>
    </>
  );
}

export default ChartsType;
