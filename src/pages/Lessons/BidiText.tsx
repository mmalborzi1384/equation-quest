/** Isolate inline Arabic/Persian/ASCII numbers and algebra within RTL teaching prose. */
const expression = /[−-]?[xX۰-۹٠-٩0-9][xX۰-۹٠-٩0-9+−\-×÷=/.()]*/g;
export function BidiText({ children }: { children: string }) {
  return (
    <>
      {children.split(expression).flatMap((piece, i) => {
        const match = children.match(expression)?.[i];
        return match
          ? [
              piece,
              <bdi className="math" dir="ltr" key={i}>
                {match}
              </bdi>,
            ]
          : [piece];
      })}
    </>
  );
}
