import unittest

test_loader = unittest.TestLoader()
tests = test_loader.discover(start_dir='app/test', pattern='test*.py')

runnable =  unittest.TextTestRunner(verbosity=2)
runnable.run(tests)
