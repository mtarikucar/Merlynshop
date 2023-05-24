import React from "react";

function AboutCard() {
  return (
    <div className="h-fit w-full py-14 shadow-lg  lg:px-32">
      <div className="grid md-grid-cols-6 lg:grid-cols-12 p-5  bg-white w-full">
        <div className="col-span-6 flex justify-center items-center">
          <div>
            <img src="../src/assets/logo.png" alt="" />
          </div>
        </div>
        <div className="col-span-6 w-full h-full flex flex-col  justify-between  p-8 space-y-3 md:px-12 lg:px-16">
          <div className="flex justify-center text-4xl ">
            <p>Merlynshop</p>
          </div>
          <div className="flex justify-start ">
            <p>
              Stoksuz, Sermayesiz ve Ön Ödemesiz ! Siz de ürünlerimizi dijital
              platformlardan ve çevrenizdeki insanlara satarak para
              kazanabilirsiniz
            </p>
          </div>
          <div>
            <p className="text-gray-400">Merlynshop</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
