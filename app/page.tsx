"use client";

import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { addListener, launch } from "devtools-detector";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | number | null>(null);
  const [unlockForThisResult, setUnlockForThisResult] = useState(false);
  const [scientificMode, setScientificMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    addListener((isOpen) => {
      if (isOpen)
        window.location.href = "https://youtube.com/watch?v=dQw4w9WgXcQ";
    });

    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") launch();
  }, []);

  const append = (val: string) => {
    setExpression((prev) => prev + val);
  };

  const clear = () => {
    setExpression("");
    setResult(null);
    setUnlockForThisResult(false);
  };

  const calculate = () => {
    try {
      const res = evaluate(expression);
      setResult(res);
      setUnlockForThisResult(false);
    } catch {
      setResult("Expression error");
    }
  };

  const scientificCalc = (func: string) => {
    try {
      //const res = evaluate(`${func}(${expression})`)
      append(`${func}(`);
      // setResult(res);
    } catch {
      setResult("Error");
    }
  };

  const buttonBase =
    "bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition text-lg";

  const operatorStyle =
    "bg-orange-500 hover:bg-orange-400 text-white p-3 rounded-xl transition text-lg";

  const scientificStyle =
    "bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition text-sm";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[400px] border border-white/20">
          <div className="bg-black text-green-400 p-4 rounded-lg mb-6 text-right text-xl font-mono h-24 flex flex-col justify-center">
            <div className="truncate">{expression || "0"}</div>
            {unlockForThisResult && (
              <div className="text-white text-lg">= {result}</div>
            )}

            {!unlockForThisResult && result !== null && (
              <div className="text-red-400 text-sm">
                🔒 Pay $0.99 to reveal this answer
              </div>
            )}
          </div>

          <button
            onClick={() => setScientificMode(!scientificMode)}
            className="mb-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition"
          >
            {scientificMode ? "Switch to Simple" : "Switch to Scientific"}
          </button>

          <div className="space-y-3">
            {scientificMode && (
              <div className="grid grid-cols-5 gap-3">
                <button
                  onClick={() => scientificCalc("sin")}
                  className={scientificStyle}
                >
                  sin
                </button>
                <button
                  onClick={() => scientificCalc("cos")}
                  className={scientificStyle}
                >
                  cos
                </button>
                <button
                  onClick={() => scientificCalc("tan")}
                  className={scientificStyle}
                >
                  tan
                </button>
                <button
                  onClick={() => scientificCalc("sqrt")}
                  className={scientificStyle}
                >
                  √
                </button>
                <button
                  onClick={() => append("**")}
                  className={scientificStyle}
                >
                  xʸ
                </button>

                <button
                  onClick={() => scientificCalc("log10")}
                  className={scientificStyle}
                >
                  log
                </button>
                <button
                  onClick={() => scientificCalc("log")}
                  className={scientificStyle}
                >
                  ln
                </button>
                <button
                  onClick={() => scientificCalc("exp")}
                  className={scientificStyle}
                >
                  eˣ
                </button>
                <button
                  onClick={() => append("pi")}
                  className={scientificStyle}
                >
                  π
                </button>
                <button onClick={() => append("e")} className={scientificStyle}>
                  e
                </button>
                <button onClick={() => append("(")} className={scientificStyle}>
                  (
                </button>
                <button onClick={() => append(")")} className={scientificStyle}>
                  )
                </button>
                <button onClick={() => append("!")} className={scientificStyle}>
                  !
                </button>
                <button onClick={() => append("^")} className={scientificStyle}>
                  ^
                </button>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => append("7")} className={buttonBase}>
                7
              </button>
              <button onClick={() => append("8")} className={buttonBase}>
                8
              </button>
              <button onClick={() => append("9")} className={buttonBase}>
                9
              </button>
              <button onClick={() => append("/")} className={operatorStyle}>
                ÷
              </button>

              <button onClick={() => append("4")} className={buttonBase}>
                4
              </button>
              <button onClick={() => append("5")} className={buttonBase}>
                5
              </button>
              <button onClick={() => append("6")} className={buttonBase}>
                6
              </button>
              <button onClick={() => append("*")} className={operatorStyle}>
                ×
              </button>

              <button onClick={() => append("1")} className={buttonBase}>
                1
              </button>
              <button onClick={() => append("2")} className={buttonBase}>
                2
              </button>
              <button onClick={() => append("3")} className={buttonBase}>
                3
              </button>
              <button onClick={() => append("-")} className={operatorStyle}>
                −
              </button>

              <button onClick={() => append("0")} className={buttonBase}>
                0
              </button>
              <button onClick={() => append(".")} className={buttonBase}>
                .
              </button>
              <button onClick={() => append("%")} className={buttonBase}>
                %
              </button>
              <button onClick={() => append("+")} className={operatorStyle}>
                +
              </button>

              <button
                onClick={clear}
                className="bg-red-500 hover:bg-red-400 text-white p-3 rounded-xl transition col-span-2"
              >
                C
              </button>

              <button
                onClick={calculate}
                className="bg-green-500 hover:bg-green-400 text-white p-3 rounded-xl transition col-span-2"
              >
                =
              </button>
            </div>
          </div>

          {result !== null && !unlockForThisResult && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition"
            >
              💳 Pay $0.99 to Reveal Answer
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Complete Payment
            </h2>

            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "0.99",
                      },
                      description: "Unlock One Calculator Answer",
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (!actions.order) return;

                await actions.order.capture();

                setUnlockForThisResult(true);
                setShowModal(false);
              }}
              onError={(err) => {
                console.error(err);
                alert("Payment failed 😭");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
