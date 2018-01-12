import { AclRule } from './acl-rule';
export class Acl {
    siteId = '';
    name: String = '';
    ipProtocol: String = '';
    rules: Array<AclRule> = [];
    description: String;
}
