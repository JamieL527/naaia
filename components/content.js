
import React from "react";
import Container from "./container";


const Contents = (props) => {
  const { data } = props;
  return (
    <>
      <Container className="w-full">
    
          <div>
            <div className="flex flex-col w-full lg:order-1">
              <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-2xl">
                {data.title}
              </h3>
              <p className="py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
                {data.desc}
              </p>
            </div>

            <div className="w-full">
              {data.bullets.map((item, index) => (
                <Content key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Content>
              ))}
            </div>

          </div>
      </Container>
    </>
  );
};

function Content(props) {
  return (
    <>
      <div className="flex items-start mt-1 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-4 h-4">
          
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800">
            {props.title}
          </h4>
        </div>
      </div>
    </>
  );
}

export default Contents;
