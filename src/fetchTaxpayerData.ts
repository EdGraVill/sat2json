export default async function fetchTaxpayerData(satURL: string): Promise<HTMLDivElement> {
  const response = await fetch(satURL);
  const text = await response.text();

  const div = document.createElement('div');
  const fiscalData = /<form(.|\n)*?\/form>/.exec(text)?.[0];

  if (!fiscalData) {
    throw new Error('Unable to extract taxpayer information');
  }

  div.innerHTML = fiscalData;

  return div;
}
