import {BaseCommand} from "./BaseCommand.js";

describe('BaseCommand', function () {
  describe('queryBy functions', function () {
    it('should set the where param', function () {
      const command = new BaseCommand();
      command.initQueryBy(['some_param', 'another_param']);
      command.queryBySomeParam("value1").queryByAnotherParam("value2");
      expect(command.params).toEqual({
        'where[some_param]': 'value1',
        'where[another_param]': 'value2'
      });
    });
  });
  
  describe('orderBy functions', function () {
    it('should set the order param', function () {
      const command = new BaseCommand();
      command.initOrderBy(['some_param', 'another_param']);
      command.orderBySomeParam();
      expect(command.params).toEqual({
        'order': 'some_param'
      });
      command.orderByAnotherParam();
      expect(command.params).toEqual({
        'order': 'another_param'
      });
    });
  });
  
  describe('include functions', function () {
    it('should set the include param as a comma separate string', function () {
      const command = new BaseCommand();
      command.initIncludes(['some_param', 'another_param']);
      command.includeSomeParam().includeAnotherParam(true);
      expect(command.params).toEqual({
        'include': 'some_param,another_param'
      });
    });
    
    it('should remove the include params that were previously set', function () {
      const command = new BaseCommand();
      command.initIncludes(['some_param', 'another_param']);
      command.includeSomeParam().includeAnotherParam();
      command.includeSomeParam(false);
      expect(command.params).toEqual({
        'include': 'another_param'
      });
    });
    
    it('should not duplicate include params', function () {
      const command = new BaseCommand();
      command.initIncludes(['some_param', 'another_param']);
      command.includeSomeParam().includeAnotherParam().includeSomeParam();
      expect(command.params).toEqual({
        'include': 'some_param,another_param'
      });
    });
  
    it('should unset include params after removing all', function () {
      const command = new BaseCommand();
      command.initIncludes(['some_param', 'another_param']);
      command.includeSomeParam().includeAnotherParam();
      command.includeSomeParam(false).includeAnotherParam(false);
      expect(command.params).toEqual({});
    });
  
    it('should unset include params without any calls', function () {
      const command = new BaseCommand();
      command.initIncludes(['some_param', 'another_param']);
      expect(command.params).toEqual({});
    });
  });
});
