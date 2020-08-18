interface ITemplateVariables {
  [key: string]: string | number;
}

/**
 * Como queremos receber um número indefinido de variáveis, podemos criar
 * uma interface passando para ela aquele formato de key: string
 */

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
