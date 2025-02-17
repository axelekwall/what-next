import { ElementType, ReactNode } from 'react';
import { IconType } from 'react-icons';

type Meta = {
  parent: { [key: string]: any };
  path: string[];
  document: { [key: string]: any };
};

type CustomRuleCallback = (
  field: any,
  meta: Meta
) => true | string | Promise<true | string>;

export type RuleType = {
  required: () => RuleType;
  custom: (cb: CustomRuleCallback) => RuleType;
  min: (min: number) => RuleType;
  max: (max: number) => RuleType;
  length: (exactLength: number) => RuleType;
  greaterThan: (gt: number) => RuleType;
  lessThan: (lt: number) => RuleType;
  uri: (options: { scheme: string[] }) => RuleType;
  integer: () => RuleType;
  precision: (limit: number) => RuleType;
};

type Validation = (rule: RuleType) => RuleType | RuleType[];

export type CommonFieldProps = {
  title?: string;
  fieldset?: string;
  validation?: Validation;
  description?: string;
  hidden?: boolean;
  readOnly?: boolean;
  defaultValue?: any;
  inputComponent?: ElementType;
};

export type StringField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'string';
  options?:
    | {
        list: { title: string; value: string }[] | string[];
        layout?: string;
      }
    | never;
};

export type NumberField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'number';
  options?: {
    list: { title: string; value: string }[] | string[];
  };
};

export type TextField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'text';
  rows?: number;
};

export type BooleanField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'boolean';
  options?: {
    layout?: 'switch' | 'checkbox';
  };
};

export type DateField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'date';
  options?: {
    dateFormat?: string;
  };
};

export type SlugField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'slug';
  options?: {
    source?: string;
  };
};

export type UrlField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'url';
};

export type BlockField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'block';
  styles?: Array<{
    title: string;
    value: string;
    blockEditor?: {
      render: ElementType;
    };
    icon?: ElementType;
  }>;
  lists?: Array<{
    title: string;
    value: string;
  }>;
  marks?: {
    annotations?: ArrayOf[];
    decorators?: Array<{
      title: string;
      value: string;
      blockEditor?: {
        icon?: ElementType;
        render?: ElementType;
      };
      icon?: ElementType;
    }>;
  };
  of?: ArrayOf[];
  icon?: ElementType;
};

type ArrayOf =
  | ObjectField
  | ReferenceField
  | ImageField
  | { type: string }
  | BlockField;

export type ArrayField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'array';
  of: ArrayOf[];
  options?: {
    sortable?: boolean;
    layout?: 'grid' | 'tags' | 'list';
  };
};

type FilterFunctionResult = { filter: string; filterParams?: string };
type FilterFunction = (args: {
  document: { [key: string]: any };
  parentPath: string[];
  parent: Record<string, unknown>[];
}) => FilterFunctionResult;

type ReferenceField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'reference';
  to: { type: string }[];
  options?: {
    filter: string | FilterFunction;
    filterParams?: { [key: string]: string };
  };
};

type ImageField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'image';
  options?: {
    hotspot?: boolean;
  };
};

type FileField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'file';
};

export type CustomField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'money' | 'color' | 'icon' | 'iconPicker' | 'blockContent' | 'metadata' | 'richText';
  options?: Record<string, any>;
};

export type FieldCollection = Array<Field>;

export type Field<Name extends string = string> =
  | StringField<Name>
  | NumberField<Name>
  | TextField<Name>
  | BooleanField<Name>
  | DateField<Name>
  | SlugField<Name>
  | UrlField<Name>
  | ArrayField<Name>
  | ReferenceField<Name>
  | ImageField<Name>
  | FileField<Name>
  | ObjectField<Name>
  | BlockField<Name>
  | CustomField<Name>;

type Preview = {
  select?: { [key: string]: string };
  prepare?: (selection: { [key: string]: any }) => {
    title?: ReactNode;
    subtitle?: ReactNode;
    media?: ReactNode;
  };
  component?: React.VFC;
};

type Fieldset = {
  name: string;
  title: string;
  options?: { collapsible: boolean; collapsed?: boolean; columns?: number };
};

export type ObjectField<Name extends string = string> = CommonFieldProps & {
  name: Name;
  type: 'object';
  title?: string;
  fields: FieldCollection;
  validation?: Validation;
  preview?: Preview;
  fieldsets?: Fieldset[];
  description?: string;
  options?: { collapsible?: boolean; collapsed?: boolean };
};

type Action = 'update' | 'publish' | 'delete' | 'create';

export type Document = {
  type: 'document';
  name: string;
  icon?: IconType;
  fields: FieldCollection;
  title?: string;
  __experimental_actions?: Action[];
  validation?: Validation;
  preview?: Preview;
  fieldsets?: Fieldset[];
  description?: string;
  initialValue?: { [key: string]: any };
  orderings?: {
    name: string;
    title: string;
    by: { field: string; direction: string }[];
  }[];
};

export type PreviewProps<T extends Record<string, any>> = {
  value: T;
};

export type Body2TextProps = { children: React.FunctionComponent<any> };
