import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CountUp from "react-countup";

function OfferModal({ openOffer, setOpenOffer, price }) {
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [showDesicion, setShowDesicion] = useState(null);

  // Belirli bir aralıkta rastgele sayı oluşturan bir fonksiyon
  const getRandomDiscount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    // price'ın %10-%20 altında yeni bir değer belirliyoruz
    if (price) {
      const minDiscount = price * 0.1;
      const maxDiscount = price * 0.2;
      const discount = getRandomDiscount(minDiscount, maxDiscount);
      setDiscountedPrice(price - discount);
    }
  }, [price]);
  const handleAccept = () => {
    console.log("Teklif kabul edildi!");
    // Burada kredi düşme işlemi gerçekleştirilebilir
    setOpenOffer(false);
  };

  const handleDecline = () => {
    console.log("Teklif reddedildi!");
    // Burada kredi düşme işlemi gerçekleştirilebilir
    setOpenOffer(false);
  };
  return (
    <Transition.Root show={openOffer} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpenOffer}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 text-center sm:pb-4">
                  sistemin size yeni teklifi:
                  {discountedPrice && (
                    <div className={`text-4xl font-bold  ${showDesicion ? "text-green-500":"text-red-500"}`}>
                      <CountUp
                      onStart={() => setShowDesicion(false)}
                        start={0}
                        end={discountedPrice}
                        duration={2.5}
                        separator=","
                        decimals={2}
                        decimal="."
                        prefix="₺"
                        onEnd={() => setShowDesicion(true)}
                      />
                    </div>
                  )}
                  {showDesicion && (
                    <div className="mt-6 flex justify-around">
                      <button
                        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                        onClick={handleDecline}
                      >
                        Teklifi Reddet (1 Kredi)
                      </button>
                      <button
                        className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors"
                        onClick={handleAccept}
                      >
                        Teklifi Kabul Et (2 Kredi)
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default OfferModal;
