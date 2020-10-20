import React from "react";

function About() {
  return (
    <div>
      <h1>About this app</h1>
      <h3 className="my-1">Fullstack App to manage contacts</h3>
      <h4>MERNSTACK</h4>
      <ul>
        <li>MongoDb (Atlas)</li>
        <li>Express</li>
        <li>React</li>
        <li>Node</li>
        <li>Rest API's</li>
      </ul>
      <p className="bg-dark p">
        <strong>Version:1.0</strong> {`**********`}
        <i>developed by Zam</i>
      </p>
    </div>
  );
}

export default About;
